# The arguments to SUBSTRUCT_CASE are (n, v1, v2, v3, v4)
# Type 0 is Growth (G)
# Type 1 is Attacks (A)
# Type 2 is EVs (E)
# Type 3 is Miscellaneous (M)
# Let's map them.
cases = [
    ( 0,0,1,2,3),
    ( 1,0,1,3,2),
    ( 2,0,2,1,3),
    ( 3,0,3,1,2),
    ( 4,0,2,3,1),
    ( 5,0,3,2,1),
    ( 6,1,0,2,3),
    ( 7,1,0,3,2),
    ( 8,2,0,1,3),
    ( 9,3,0,1,2),
    (10,2,0,3,1),
    (11,3,0,2,1),
    (12,1,2,0,3),
    (13,1,3,0,2),
    (14,2,1,0,3),
    (15,3,1,0,2),
    (16,2,3,0,1),
    (17,3,2,0,1),
    (18,1,2,3,0),
    (19,1,3,2,0),
    (20,2,1,3,0),
    (21,3,1,2,0),
    (22,2,3,1,0),
    (23,3,2,1,0)
]
types = ['G', 'A', 'E', 'M']
perms = []
for n, v1, v2, v3, v4 in cases:
    # v1 is the index of type 0 (G)
    # v2 is the index of type 1 (A)
    # v3 is the index of type 2 (E)
    # v4 is the index of type 3 (M)
    order = [''] * 4
    order[v1] = 'G'
    order[v2] = 'A'
    order[v3] = 'E'
    order[v4] = 'M'
    perms.append("'" + "".join(order) + "'")

print(f"export const SUBSTRUCTURE_ORDER = [\n  {', '.join(perms[:8])},\n  {', '.join(perms[8:16])},\n  {', '.join(perms[16:])}\n];")
