<?php
declare(strict_types=1);

// FootballData SDK utility: result_headers

class FootballDataResultHeaders
{
    public static function call(FootballDataContext $ctx): ?FootballDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
