<?php
declare(strict_types=1);

// FootballData SDK utility: prepare_body

class FootballDataPrepareBody
{
    public static function call(FootballDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
