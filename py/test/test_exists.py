# ProjectName SDK exists test

import pytest
from footballdata_sdk import FootballDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FootballDataSDK.test(None, None)
        assert testsdk is not None
