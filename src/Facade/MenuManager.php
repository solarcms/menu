<?php

namespace Solarcms\MenuManager\Facade;

use Illuminate\Support\Facades\Facade as Facade;

class MenuManager extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'MenuManager';
    }
}