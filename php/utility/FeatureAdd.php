<?php
declare(strict_types=1);

// FootballData SDK utility: feature_add

class FootballDataFeatureAdd
{
    public static function call(FootballDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
