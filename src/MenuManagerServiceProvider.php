<?php

namespace Solarcms\MenuManager;

use Illuminate\Support\ServiceProvider as ServiceProvider;

class MenuManagerServiceProvider extends ServiceProvider
{


    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {


        // For publishing configuration file
        $this->publishes([
            __DIR__ . '/Config/SolarMenuConfig.php' => config_path('solar_menu_config.php'),
        ], 'menu-config');

        // For publishing assets
        $this->publishes([
            __DIR__ . DIRECTORY_SEPARATOR . 'Assets'. DIRECTORY_SEPARATOR . 'dist' => public_path('shared/menu'),
        ], 'menu');
        $this->publishes([
            __DIR__ . DIRECTORY_SEPARATOR . 'migration'. DIRECTORY_SEPARATOR . '2016_03_09_113321_create_menu_table.php' => base_path('database'. DIRECTORY_SEPARATOR . 'migrations'. DIRECTORY_SEPARATOR . '2016_03_09_113321_create_menu_table.php'),
        ], 'menu-migration');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {

        $this->mergeConfigFrom(__DIR__ . '/Config/SolarMenuConfig.php', 'MenuManager');

        // View
        $this->loadViewsFrom(__DIR__ . DIRECTORY_SEPARATOR .'Views', 'MenuManager');

        $this->app['MenuManager'] = $this->app->share(function ($app) {
            return new MenuManager;
        });
    }
}