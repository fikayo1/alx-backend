#!/usr/bin/python3
""" FifoCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFOcache defines FIFOstyle cache
    """
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Get the first item inserted (FIFO)
            first_item = next(iter(self.cache_data))
            del self.cache_data[first_item]
            print("DISCARD:", first_item)
        self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
