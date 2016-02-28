<?php

namespace Solarcms\MenuManager\MenuManager;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Response;
use Request;
use Illuminate\Routing\ResponseFactory as Resp;


use Illuminate\Support\Facades\Validator;
use App;

class Menu
{
    public $viewName = 'admin.menu';
    public $default_locale = 'EN';
    public $locales_table = 'locales';

    public function run($action){


        // purpose: built-in controller
        switch($action){


            case "index":         return $this->index($this->viewName);       break;


            default:              return $this->index($this->viewName);
        }

    }

    public function index($viewName){



            if (Session::has('locale')) {

            } else {
                Session::set('locale', $this->default_locale);
            }

            $locales = DB::table($this->locales_table)->select('id', 'code')->orderBy('id', 'ASC')->get();


        $menuSetup = [
            'default_locale'=>Session::get('locale'),
            'locales'=>$locales,
        ];

        ////

        return view($viewName, compact('page_name', 'menuSetup'));
    }

}