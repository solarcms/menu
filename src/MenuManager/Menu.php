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

        $menu_slugs = DB::table('menu_type')->get();

        $menuTypes = [];

        foreach($menu_slugs as $menu){
            $data = DB::table($menu->table)->select([$menu->id_field, $menu->text_field])->get();

            if($menu->translated == 1){
                foreach($data as $dat){
                    $dat = (array) $dat;
                    $dat[$menu->text_field] = $this->translate($dat[$menu->text_field]);
                }
            }

            $menuTypes[] = [
                'slug'=>$menu->slug,
                'data'=>$data
            ];
        }


        $menuSetup = [
            'default_locale'=>Session::get('locale'),
            'locales'=>$locales,
            'menuTypes'=>$menuTypes
        ];

        ////

        return view($viewName, compact('page_name', 'menuSetup'));
    }

    public function translate($data){

        $data = json_decode($data);
        $val = "";


        if (Session::has('locale')) {
            $locale = Session::get('locale');
        } else {
            $locale = $this->default_locale;
        }

        foreach($data as $d){
            if(strtolower($d->locale) == strtolower($locale)){
                $val = $d->value;
                break;
            }
        }
        return $val;
    }

}