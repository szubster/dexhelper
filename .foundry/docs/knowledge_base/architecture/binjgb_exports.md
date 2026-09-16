# binjgb WASM Exports for Ext RAM (Save Data)

## NPM Package Availability
An investigation was conducted to determine if `binjgb` or an equivalent WebAssembly Game Boy emulator is available as an official NPM package.
Search queries on the npm registry for `binjgb` yielded no direct official packages. The closest hit was an unrelated `rgbds-live` package which is an RGBDS programming environment, not the emulator itself.
Therefore, a direct, official `binjgb` NPM package is **not available**. Integration must rely on either building from source or utilizing pre-compiled WASM/JS binaries directly in our repository.

## Ext RAM WASM Exports

Based on the `binjgb` source code, specifically `src/emscripten/exported.json` and `src/emscripten/wrapper.c`, the following exports are used to access the Ext RAM (SRAM) for save extraction:

1. `_ext_ram_file_data_new(Emulator* e)`: Allocates and initializes a `FileData` struct containing a copy of the emulator's current Ext RAM. It returns a pointer to the `FileData` struct.
2. `_get_file_data_ptr(FileData* file_data)`: Returns a pointer (offset in WASM memory) to the actual data payload within the `FileData` struct.
3. `_get_file_data_size(FileData* file_data)`: Returns the size (in bytes) of the data payload within the `FileData` struct.
4. `_file_data_delete(FileData* file_data)`: Frees the memory associated with the `FileData` struct.

To extract the save data, the wrapper must:
1. Call `_ext_ram_file_data_new` to get a `FileData` pointer.
2. Call `_get_file_data_ptr` to get the pointer to the SRAM data in WASM memory.
3. Call `_get_file_data_size` to get the length of the SRAM data.
4. Read the corresponding bytes from the WASM memory buffer.
5. Call `_file_data_delete` to free the allocated `FileData` struct.

To write save data back to the emulator, the following functions are used:
1. `_emulator_write_ext_ram(Emulator* e, FileData* file_data)`
