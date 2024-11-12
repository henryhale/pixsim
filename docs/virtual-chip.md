# PixSim | Virtual Chip

## Overview

The chip simulation is basic and only includes the functionality limited to our [objectives](../README.md).

The main components of the chip include;

### Internal Registers

These are memory locations with in the chip that store the state used when manipulating pixels on the display unit.

_For now, all available registers are private and so only the chip can access them._

- `CX` - stores the x-coordinate of the cursor
- `CY` - stores the y-coordinate of the cursor

Both `CX` and `CY` are manipulated for instructions: `MOV*`, `ADD*` and `SUB*`.

For each pixel, there is a backing storage unit (say a flip flop - technically) that keep it's state.

### Program Counter

This is a storage unit that stores the memory location of the next instruction to be executed.
The chip increments its value by one after execution of an instruction.

### Status Flags

The chip's state consists of flags that affect it functionality;
- `running`: set to `1` when the chip is executing an instruction, `0` otherwise
- `signal`: indicates whether an instruction has been scheduled for execution

### Display Interface Channel

Think of this as the medium through which the chip communicates with the display unit. Normally, it's a cable like VGA cable, where the chip sends signals/commands that the display unit can execute - [actions](./display-unit.md#actions) 

## Instruction Cycle

This chip uses the [_fetch-decode-execute_](https://wikipedia.org/wiki/Instruction_cycle) cycle when executing a program. 
The program to be executed is loaded into main memory and the program counter is reset to point to the start of the program's memory location, say PC = 0 (zero).

## Interface

The public interface provided by the chip defines;
- `reset`: resets the state of the chip
- `load`: fetches the program to be executed
- `step`: executes the next instruction in the program
- `run`: executes the entire program line by line

## Implementation

The chip's simulation source code is located under the [source/chip](../source/chip/) folder.

## References

- [Instruction Cycle - Wikipedia](https://wikipedia.org/wiki/Instruction_cycle)
- [Instruction Set Simulator - Wikipedia](https://wikipedia.org/wiki/Instruction_set_simulator)
