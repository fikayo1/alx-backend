#!/usr/bin/python3
""" MRUCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """
    MRUCache defines MRU style cache
    """

    def __init__(self):
        super().__init__()
        self.key_order = []

    def put(self, key, item):
        """ Add an item to the cache
        """
        if key is None or item is None:
            return

        if key in self.key_order:
            self.key_order.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Get the most recently used item (MRU)
            mru_key = self.key_order.pop()
            del self.cache_data[mru_key]
            print("DISCARD:", mru_key)

        self.key_order.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None

        # Update the key order on each access
        self.key_order.remove(key)
        self.key_order.append(key)

        return self.cache_data[key]
