<?php

require_once __DIR__.'/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;

$app = new Silex\Application();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../resources/twig'
));

$app->register(new SilexAssetic\AsseticServiceProvider());

$app['assetic.path_to_web'] = __DIR__;
$app['assetic.options'] = array(
        'auto_dump_assets' => true,
        'debug' => false
    );
$app['assetic.filter_manager'] = $app->share(
    $app->extend('assetic.filter_manager', function($fm, $app) {
        $fm->set('cssmin', new Assetic\Filter\CssMinFilter());

        return $fm;
    })
);

$app->get('/', function() use ($app) {

    // load the image map
    $images = file_get_contents(__DIR__ . '/assets/scribble/images.json');
    $images = json_decode($images);

    return $app['twig']->render('index.twig', array(
        'images' => $images->dummy // we have one image set only right now
    ));
});

$app->run();
