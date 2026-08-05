#!/bin/bash
# Wrapper script to execute bash commands with a timeout

if [ "$#" -eq 0 ]; then
    echo "Usage: $0 <command>"
    exit 1
fi

COMMAND_STR="$*"

if [[ "$COMMAND_STR" == *"tail -f"* ]]; then
    echo "Error: Static analysis detected a known blocking command ('tail -f')." >&2
    echo "Execution prevented to avoid infinite hangs." >&2
    echo "Please use non-blocking alternatives like 'cat' or 'tail -n'." >&2
    exit 1
fi

# Set a threshold of 30 seconds
TIMEOUT_DURATION=30

timeout "$TIMEOUT_DURATION"s "$@"
EXIT_CODE=$?

if [ $EXIT_CODE -eq 124 ]; then
    echo "Error: Command exceeded the $TIMEOUT_DURATION second threshold and was terminated." >&2
    echo "This is to prevent infinite hangs caused by blocking commands (e.g., 'tail -f')." >&2
    echo "Please use non-blocking alternatives like 'cat' or 'tail -n'." >&2
fi

exit $EXIT_CODE
