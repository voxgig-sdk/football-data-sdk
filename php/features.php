<?php
declare(strict_types=1);

// FootballData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FootballDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FootballDataBaseFeature();
            case "test":
                return new FootballDataTestFeature();
            default:
                return new FootballDataBaseFeature();
        }
    }
}
