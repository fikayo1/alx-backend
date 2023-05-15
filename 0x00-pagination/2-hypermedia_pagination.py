#!/usr/bin/env python3
"""A simple pagination example"""

import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> tuple:
    """Returns start and end index ie pagination parameters"""
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Get Data in pages"""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        indexes = index_range(page, page_size)
        dataset = self.dataset()
        try:
            dataset[indexes[1]]
            accPage = dataset[indexes[0]:indexes[1]]
        except IndexError:
            return []
        return accPage

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """Returns the hypermedia pagination"""
        dataset = self.get_page(page, page_size)
        try:
            self.get_page(page - 1, page_size)
            prev_page = page - 1
        except Exception as e:
            prev_page = None
        if (page + 1) > (len(self.dataset()) / page_size):
            next_page = None
        else:
            next_page = page + 1
        total_pages = math.ceil(len(self.dataset()) / page_size)

        return {
            "page_size": len(dataset),
            "page": page,
            "data": dataset,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
