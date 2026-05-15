<?php
declare(strict_types=1);

// FootballData SDK base feature

class FootballDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FootballDataContext $ctx, array $options): void {}
    public function PostConstruct(FootballDataContext $ctx): void {}
    public function PostConstructEntity(FootballDataContext $ctx): void {}
    public function SetData(FootballDataContext $ctx): void {}
    public function GetData(FootballDataContext $ctx): void {}
    public function GetMatch(FootballDataContext $ctx): void {}
    public function SetMatch(FootballDataContext $ctx): void {}
    public function PrePoint(FootballDataContext $ctx): void {}
    public function PreSpec(FootballDataContext $ctx): void {}
    public function PreRequest(FootballDataContext $ctx): void {}
    public function PreResponse(FootballDataContext $ctx): void {}
    public function PreResult(FootballDataContext $ctx): void {}
    public function PreDone(FootballDataContext $ctx): void {}
    public function PreUnexpected(FootballDataContext $ctx): void {}
}
