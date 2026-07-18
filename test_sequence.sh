find .foundry/ -name "*.md" | grep -E ".*-(idea|prd|epic|story|task)-" | awk -F'-' '{print $3}' | sort -n | tail -n 5
