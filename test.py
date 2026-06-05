import json

replies = [
    {
        "comment_id": "4629489785",
        "reply": "You're right, simply filtering out the encounters without offering a path to obtain the rod is not ideal for the user. A better approach would be to suggest finding the required rod (e.g., 'Find the Old Rod') if the user hasn't gotten it yet, rather than silently hiding the fishing encounters. I'll need to look at implementing a feature that suggests finding the necessary utility items based on their badges/progression."
    }
]
print(json.dumps(replies))
