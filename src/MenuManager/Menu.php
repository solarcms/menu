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

        $menu_slugs = DB::table('menu_type')->get();

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
        DB::table('menus')->insert($new);

        return 'success';
    }
    public function updateMenu(){
        $menu = Request::input('menu');
        $id = Request::input('id');

        $new = [
          'slug'=>$menu['slug'],
            'items'=>json_encode($menu['items'])
        ];
        DB::table('menus')->where('id', '=', $id)->update($new);

        return 'success';
    }
    public function deleteMenu(){

        $id = Request::input('id');

        DB::table('menus')->where('id', '=', $id)->delete();

        return 'success';
    }
    public function listMenu(){

        $menus = DB::table('menus')->get();

        return $menus;
    }

}