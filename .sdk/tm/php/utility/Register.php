<?php
declare(strict_types=1);

// FootballData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FootballDataUtility::setRegistrar(function (FootballDataUtility $u): void {
    $u->clean = [FootballDataClean::class, 'call'];
    $u->done = [FootballDataDone::class, 'call'];
    $u->make_error = [FootballDataMakeError::class, 'call'];
    $u->feature_add = [FootballDataFeatureAdd::class, 'call'];
    $u->feature_hook = [FootballDataFeatureHook::class, 'call'];
    $u->feature_init = [FootballDataFeatureInit::class, 'call'];
    $u->fetcher = [FootballDataFetcher::class, 'call'];
    $u->make_fetch_def = [FootballDataMakeFetchDef::class, 'call'];
    $u->make_context = [FootballDataMakeContext::class, 'call'];
    $u->make_options = [FootballDataMakeOptions::class, 'call'];
    $u->make_request = [FootballDataMakeRequest::class, 'call'];
    $u->make_response = [FootballDataMakeResponse::class, 'call'];
    $u->make_result = [FootballDataMakeResult::class, 'call'];
    $u->make_point = [FootballDataMakePoint::class, 'call'];
    $u->make_spec = [FootballDataMakeSpec::class, 'call'];
    $u->make_url = [FootballDataMakeUrl::class, 'call'];
    $u->param = [FootballDataParam::class, 'call'];
    $u->prepare_auth = [FootballDataPrepareAuth::class, 'call'];
    $u->prepare_body = [FootballDataPrepareBody::class, 'call'];
    $u->prepare_headers = [FootballDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [FootballDataPrepareMethod::class, 'call'];
    $u->prepare_params = [FootballDataPrepareParams::class, 'call'];
    $u->prepare_path = [FootballDataPreparePath::class, 'call'];
    $u->prepare_query = [FootballDataPrepareQuery::class, 'call'];
    $u->result_basic = [FootballDataResultBasic::class, 'call'];
    $u->result_body = [FootballDataResultBody::class, 'call'];
    $u->result_headers = [FootballDataResultHeaders::class, 'call'];
    $u->transform_request = [FootballDataTransformRequest::class, 'call'];
    $u->transform_response = [FootballDataTransformResponse::class, 'call'];
});
