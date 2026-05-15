<?php
declare(strict_types=1);

// FootballData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FootballDataMakeContext
{
    public static function call(array $ctxmap, ?FootballDataContext $basectx): FootballDataContext
    {
        return new FootballDataContext($ctxmap, $basectx);
    }
}
