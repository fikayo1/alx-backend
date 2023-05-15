#!/usr/bin/env python3
"""A simple helper function"""


def index_range(page: int, page_size: int) -> tuple:
    start_index = (page - 1) * page_size
    end_index = start_index + (page_size - 1)
    return (start_index, end_index)