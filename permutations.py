import itertools
def get_perms():
  # Wait, bulbapedia says it's a specific set of 24 permutations, but let's check what the standard says.
  # The formula is typically:
  # pv % 24
  # There are 24 permutations. The order is:
  # 0: GAEM, 1: GAME, 2: GEAM, 3: GEMA, 4: GMAE, 5: GMEA
  # 6: AGEM, 7: AGME, 8: AEGM, 9: AEMG, 10: AMGE, 11: AMEG
  # 12: EGAM, 13: EGMA, 14: EAGM, 15: EAMG, 16: EMGA, 17: EMAG
  # 18: MGAE, 19: MGEA, 20: MAGE, 21: MAEG, 22: MEGA, 23: MEAG
  pass
