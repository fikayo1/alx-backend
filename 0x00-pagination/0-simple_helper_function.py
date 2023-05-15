#!/usr/bin/env python3
"""A simple helper function"""


def index_range(page: int, page_size: int) -> tuple:
    """Returns start and end index ie pagination parameters"""
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index
