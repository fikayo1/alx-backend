#!/usr/bin/python3
""" LifoCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFOcache defines LIFOstyle cache
    """
    def __init__(self):
        super().__init__()
        self.key_order = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Get the last item inserted (LIFO)
            last_item = self.key_order.pop()
            del self.cache_data[last_item]
            print("DISCARD:", last_item)

        self.key_order.append(key)
        self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
