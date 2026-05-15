<?php
declare(strict_types=1);

// FootballData SDK utility: result_body

class FootballDataResultBody
{
    public static function call(FootballDataContext $ctx): ?FootballDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
