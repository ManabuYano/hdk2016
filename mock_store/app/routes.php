<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// ページ表示
Route::get('/', 'PageController@index');
Route::get('/index', function(){
	return Redirect::to('/');
});
Route::get('/maintenance', 'PageController@maintenance');

// ソート
Route::get('/updated', 'PageController@updated');
Route::get('/unupdated', 'PageController@unupdated');
Route::get('/recentlyStarted', 'PageController@recentlyStarted');
Route::get('/previouslyStarted', 'PageController@previouslyStarted');
Route::get('/reviewed', 'PageController@reviewed');

// 検索
Route::any('/search', 'PageController@search');

Route::get('/{page}', 'PageController@detail')->where('page', '[0-9]+');
Route::get('/login', 'PageController@login');
Route::get('/signin', 'PageController@signin');
Route::get('/term', 'PageController@term');

// API
Route::get('/{page}/get', 'AppController@getAppInfo');
Route::get('/{page}/feedbacks/get', 'AppController@getAppFeedbacks');
Route::post('/{page}/post/review', 'AppController@postReview');
Route::post('/register', 'UserController@register');


// テスト
Route::get('/user', 'User@showUser');
Route::get('/hello', function(){
});

// Auth
Route::when('/', 'userAgent');
Route::when('/', 'auth');

// ログイン処理
Route::post('/login', 'LogInOutController@logIn');
Route::get('/logout', 'LogInOutController@logOut');

Route::get('/iptest', function(){
	echo Request::ip();
	//echo Request::server('REMOTE_ADDR');
	//echo $ipAddress = $_SERVER["REMOTE_ADDR"];
});

// パスワード変更
// 厳重注意！
Route::get('/allpasswordchange', 'UserController@allPasswordChange');
Route::get('/{id}/passwordchange', 'UserController@passwordChange');

// パスワード確認
Route::get('/{id}/showpassword', 'UserController@showPassword');