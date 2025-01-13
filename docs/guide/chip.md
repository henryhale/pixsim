# Virtual Chip

## Overview

The chip simulation is basic and only includes the functionality limited to our
[objectives](./index.md#objectives) and more specifically to executing
instructions in the [instruction set](./isa.md#instruction-set).

The main components of the chip include;

## Internal Registers

These are memory locations with in the chip that store the state used when
manipulating pixels on the display unit.

_For now, all available registers are private and so only the chip can access
them._

-   `CX` - stores the x-coordinate of the cursor
-   `CY` - stores the y-coordinate of the cursor

Both `CX` and `CY` are manipulated for instructions: `MOVX`, `MOVY`, `ADDX`,
`ADDY`, `SUBX`, and `SUBY`.

For each pixel, there is a backing storage unit (say a flip flop - technically)
that keep it's state.

## Program Counter

This is a storage unit that stores the memory location of the next instruction
to be executed. The chip increments its value by one after execution of an
instruction.

## Status Flags

The chip's state consists of flags that affect it functionality;

-   `running`: set to `1` when the chip is executing an instruction, `0`
    otherwise
-   `signal`: indicates whether an instruction has been scheduled for execution

## Display Interface Channel

Think of this as the medium through which the chip communicates with the display
unit. Normally, it's a cable like VGA cable, where the chip sends
signals/commands that the display unit can execute -
[actions](./display.md#actions)

## Instruction Cycle

This chip uses the
[_fetch-decode-execute_](https://wikipedia.org/wiki/Instruction_cycle) cycle
when executing a program. The program to be executed is loaded into main memory
and the program counter is reset to point to the start of the program's memory
location, say PC = 0 (zero).

## Interface

The public interface provided by the chip defines;

-   `reset`: resets the state of the chip
-   `load`: fetches the program to be executed
-   `step`: executes the next instruction in the program
-   `run`: executes the entire program line by line

## Chip's Clock Speed

To simulate the chip's instruction execution process, we used the
[setTimeout API](https://developer.mozilla.org/docs/Web/API/Window/setTimeout)
with a default timeout value of `100` milliseconds.

This implies that, by default;

-   each instruction takes in `100` ms to execute

To determine the clock speed, we need to figure out how many clock cycles occur
in `1` ms and how many cycles correspond to one instruction.

Technically, the clock speed is the number of cycles per instruction.

Clock speed = `number of clock cycles` / `instruction time (seconds)`

So by default, clock speed = (1 / 0.1) = 10 Hz

For the purposes of experimentation and customization, the chip's clock speed is
configurable. Below is a list of speeds provided in the
[language playground](https://henryhale.github.io/pixsim/app/index.html).

| **Time (ms)** | **Clock Speed (Hz)** |
| ------------- | -------------------- |
| -             | MAX-2                |
| 0             | MAX-1                |
| 1             | 1000                 |
| 10            | 100                  |
| 100           | 10                   |

### Maximum Clock Speed:

To achieve the maximum clock speed, theoretically, there must be no delay
between execution of consecutive instructions. There are two approaches:

1. `MAX-1`: use timeout = `0` for `setTimeout` function
2. `MAX-2`: use infinite loop to execute one instruction at a time - break after
   the last

`MAX-1` is a practical example of
[zero delays](https://developer.mozilla.org/docs/Web/JavaScript/Event_loop#zero_delays)
that which executes the instruction after the current task queue is empty. It
actually creates irrational delays thereby giving slow rendering speeds.

Unlike `MAX-1`, `MAX-2` is swift and produces near-instatenuos rendering speed -
since each iteraction completes with dom changes applied without any
interruptions.

After several experimentation, `MAX-1` is asynchronous and great if there too
many changes to render since it is
[never blocking](https://developer.mozilla.org/docs/Web/JavaScript/Event_loop#never_blocking),
otherwise it appears slow. `MAX-2` is synchronous, fast and great for few
changes ~~but maybe slow on some devices with low memory since is blocking (user
interaction may slow down/be blocked as the browser is executing and applying
dom updates)~~.

Thus, both options are provided to allow for user's experimentation. Use the
[playgroud](https://henryhale.github.io/pixsim/app/index.html) to run the
following code with clock speed at `MAX-1` and observe. Then try again with
`MAX-2`.

```asm
; program: draw an outlined sqaure

; clear screen
RESET

; draw 64x64 sqaure
@STROKERECT 0 0 64 64
```

## Live Demo

In the language playground, the chip is the core component that executes the
instruction one after another.

-   🚀 [Playground](https://henryhale.github.io/pixsim/app/index.html)

## Implementation

View source on GitHub:
[source/chip/](https://github.com/henryhale/pixsim/blob/master/source/chip/)

## References

-   [Instruction Cycle - Wikipedia](https://wikipedia.org/wiki/Instruction_cycle)
-   [Instruction Set Simulator - Wikipedia](https://wikipedia.org/wiki/Instruction_set_simulator)
-   [Fetch-Decode-Execute - Wikipedia](https://wikipedia.org/wiki/Instruction_cycle)
-   [setTimeout API](https://developer.mozilla.org/docs/Web/API/Window/setTimeout)
-   [Event Loop](https://developer.mozilla.org/docs/Web/JavaScript/Event_loop)
-   [Zero Delays - MDN](https://developer.mozilla.org/docs/Web/JavaScript/Event_loop#zero_delays)
