# Prizm | 3D Turing Machine
Prizim is just a tiny esolang I made in JS similar to BrainF except you can move in three dimensions for an added challenge.

# How it Works
You can control a cursor (X), selector (Y) and pointer (Z) to locate various cells. You increment cells up and down to change their value and can output to the console according to the ASCII value of the cell.

What's really happening is you are navigating through nested arrays, and incrementing values inside those arrays.

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
| J      | Jump | Jumps to the first Jump Point |
| O      | Output | Output the ASCII value of the current cell |
| N      | Null | Skips Position on Code/Does Nothing |
