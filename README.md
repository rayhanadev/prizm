# Prizm | 3D Turing Machine
Prizm is just a tiny esolang I made in JS similar to BrainF except you can move in three dimensions for an added challenge.

## How to Use
Firstly you create a main.pzm (has to be this!) file. The first line is the length (X) of the prism, the second is height (Y) of the prism, the third is the depth (Z) of the prism, the fourth is the debug settings (true/false) and lastly anything after that is code. The file must be formatted like such or else it will throw an error when reading.

For Example:
```pzm
5
5
5
true
+++
F++R+B++
RRRF++
```

You control a cursor (X), selector (Y) and pointer (Z) to locate various cells. You increment cells up and down to change their value and can output to the console according to the ASCII value of the cell.

You initially start in the top, left, back corner of the prism and are able to resize it to a limit of 999 cells in any direction. Each cell starts with an initial value of zero.

# Commands
| Symbol | Keyword | Action |
| :----: | ------- | ------ |
| +      | Increment Up | Increments a Cell Up |
| -      | Increment Down | Increments a Cell Down |
| L      | Left | Moves the Cursor Left |
| R      | Right | Moves the Cursor Right |
| U      | Up | Moves the Selector Up |
| D      | Down | Moves the Selector Down |
| F      | Forward | Moves the Pointer Forward |
| B      | Backward | Moves the Pointer Backward |
| P      | Point | Marks a Jump Point |
| J      | Jump | Jumps to the first available Jump Point if the cell the jump point marked isn't 0 |
| O      | Output | Output the ASCII value of the current cell |
| N      | Null | Skips Position on Code/Does Nothing |
