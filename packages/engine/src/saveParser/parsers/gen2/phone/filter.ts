import { GEN2_PHONE_CALLER_REGISTRY, type HighValueContact } from './constants';

/**
 * Filters a list of phone contact IDs to identify high-value callers (Swarms or Items).
 *
 * @param phoneList - An array of contact IDs registered in the player's Pokegear.
 * @returns An array of HighValueContact objects for matching contacts.
 */
export function filterHighValueCalls(phoneList: number[]): HighValueContact[] {
  const highValueContacts: HighValueContact[] = [];

  for (const contactId of phoneList) {
    if (contactId === 0) continue; // 0 represents an empty/unused slot

    const registryEntry = GEN2_PHONE_CALLER_REGISTRY[contactId];

    if (registryEntry) {
      highValueContacts.push({
        id: contactId,
        ...registryEntry,
      });
    }
  }

  return highValueContacts;
}
