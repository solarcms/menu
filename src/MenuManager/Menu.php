<?php

namespace Solarcms\MenuManager\MenuManager;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Response;
use Request;
use Illuminate\Routing\ResponseFactory as Resp;


use Illuminate\Support\Facades\Validator;
use App;
use Config;

class Menu
{
    public $viewName = 'admin.menu';
    public $default_locale = 'MN';
    public $locales_table = 'solar_locales';
    public $menu_type_table = 'solar_menu_type';
    public $menu_table = 'solar_menus';


    function __construct()
    {
        $this->config = Config::get('solar_menu_config');

        //translation config
        $this->default_locale = $this->config['default_locale'];
        $this->locales_table = $this->config['locales_table'];
        $this->menu_type_table = $this->config['menu_type_table'];
        $this->menu_table = $this->config['menu_table'];

    }


    public function run($action){


        // purpose: built-in controller
        switch($action){


            case "index":         return $this->index($this->viewName);       break;
            case "save":         return $this->save();       break;
            case "update":         return $this->updateMenu();       break;
            case "delete":         return $this->deleteMenu();       break;
            case "list":         return $this->listMenu();       break;


            default:              return $this->index($this->viewName);
        }

    }

    public function index($viewName){



        if (Session::has('locale')) {

        } else {
                Session::set('locale', $this->default_locale);
        }


        $locales = DB::table($this->locales_table)->select('id', 'code')->orderBy('id', 'ASC')->get();

        $menu_slugs = DB::table($this->menu_type_table)->get();

        $menuTypes = [];

        foreach($menu_slugs as $menu){
            $data = DB::table($menu->table)->select([$menu->id_field, $menu->text_field])->get();

//            if($menu->translated == 1){
//                foreach($data as $dat){
//                    $dat = (array) $dat;
//                    $dat[$menu->text_field] = $this->translate($dat[$menu->text_field]);
//                }
//            }

            $menuTypes[] = [
                'slug'=>$menu->slug,
                'translated'=>$menu->translated,
                'id_field'=>$menu->id_field,
                'text_field'=>$menu->text_field,
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
    public function save(){
        $menu = Request::input('menu');

        $new = [
          'slug'=>$menu['slug'],
            'items'=>json_encode($menu['items'])
        ];
        DB::table($this->menu_table)->insert($new);

        return 'success';
    }
    public function updateMenu(){
        $menu = Request::input('menu');
        $id = Request::input('id');

        $new = [
          'slug'=>$menu['slug'],
            'items'=>json_encode($menu['items'])
        ];
        DB::table($this->menu_table)->where('id', '=', $id)->update($new);

        return 'success';
    }
    public function deleteMenu(){

        $id = Request::input('id');

        DB::table($this->menu_table)->where('id', '=', $id)->delete();

        return 'success';
    }
    public function listMenu(){

        $menus = DB::table($this->menu_table)->get();

        return $menus;
    }

}