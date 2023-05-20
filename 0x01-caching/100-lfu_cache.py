#!/usr/bin/python3
""" LFUCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """
    LFUCache defines LFU style cache
    """

    def __init__(self):
        super().__init__()
        self.key_usage = {}  # Track the usage frequency of each key

    def put(self, key, item):
        """ Add an item to the cache
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Find the key with the minimum usage frequency
            min_usage_key = min(self.key_usage, key=self.key_usage.get)
            del self.cache_data[min_usage_key]
            del self.key_usage[min_usage_key]
            print("DISCARD:", min_usage_key)

        self.cache_data[key] = item
        self.key_usage[key] = 0

    def get(self, key):
        """ Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None

        # Increment the usage frequency of the key
        self.key_usage[key] += 1

        return self.cache_data[key]
