import itertools

perms = list(itertools.permutations(['G', 'A', 'E', 'M']))
perms = sorted(perms) # Wait, is it sorted lexicographically?
print(perms)
