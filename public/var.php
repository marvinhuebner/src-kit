<?php

class Config {
    const css = 'dist/css/';
    const js = 'dist/js/';
    const favicon = 'dist/assets/favicon/';
}

function renderPage($pageName)
{
    partial('html-header');

    include 'layouts/page-'.$pageName.'.php';

    partial('html-footer');
}

function partial($name)
{
    include 'partials/' . $name . '.php';
}