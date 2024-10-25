# PixSim | Lang 
An Assembly-like language for manipulating pixels in PixSim.

## Features
### Built-ins

### Registers
| Register 		| Description					|
|---------------|-------------------------------|
| X				| X-coordinate of the cursor	|
| Y				| Y-coordinate of the cursor	|
| A				| Accumulator					|
| B				| Data register					|
| C				| Data register					|
| D				| Data register					|
>[!INFO]
>Registers are referenced using `$<register>` for example: $X

### Functions
| Function 		 | Description			 					| Example			|
|----------------|------------------------------------------|-------------------|
| `SETX <value>` | Sets the cursor's x-coord to `<value>`	| `SETX 16`			|
| `SETY <value>` | Sets the cursor's y-coord to `<value>`	| `SETY 9`			|
| `MOVX <value>` | Moves the cursor by `<value>` horizontally| `MOVX 1` - one step right |
| `MOVY <value>` | Moves the cursor by `<value>` vertically | `MOVY -1` - one step up |
| `TURN <on/off>`| Turns on/off the pixel at the cursor's position| `SET off`	|
| `DRAWLINE <X1> <Y1> <X2> <Y2>`| Turns on/off the pixel at the cursor's position| `SET off`	|

### Aliases
| Alias 		 | Equivalent			 					|
|----------------|------------------------------------------|
| `SET <x> <y>`  | `SETX <x>` and `SETY <y>`					|

### Mode of Computation
This section describes how the program is executed.
