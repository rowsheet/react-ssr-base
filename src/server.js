import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Helmet from "react-helmet";
// Include page components.
import PageHome from './pages/PageHome.js';
import PageOther from './pages/PageOther.js';
import Page404 from './pages/Page404.js';

const app = express();
app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

app.get( "/*", ( req, res ) => {
		const jsx = (
<StaticRouter location={ req.url }>
        <Switch>
                // Route all pages here.
                <Route exact path="/" component={PageHome} />
                <Route exact path="/other" component={PageOther} />
                // Route default pages here.
                <Route component={Page404} />   
        </Switch>
</StaticRouter>
		);
		// Render server side.
		const reactDom = renderToString( jsx );
		const helmetData = Helmet.renderStatic( );
		// Return rendered page to client with status code 200 (OK).
		res.writeHead( 200, { "Content-Type": "text/html" } );
		res.end( htmlTemplate( reactDom, helmetData ) );
} );

// Serve app on port 3000.
app.listen( 3000 );



































//------------------------------------------------------------------------------
// These are the base things you'll need for a bootstrap page.
//------------------------------------------------------------------------------
function htmlTemplate( reactDom, helmetData ) {
	return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="shortcut icon" href="/favicon.ico" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#000000" />
		<link rel="manifest" href="/manifest.json" />
		<!-- Custom fonts for this template-->
		<link href="https://blackrockdigital.github.io/startbootstrap-sb-admin-2/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap" rel="stylesheet">
		<!-- Custom styles for this template-->
		<link href="https://blackrockdigital.github.io/startbootstrap-sb-admin-2/css/sb-admin-2.min.css" rel="stylesheet">
		${ helmetData.title.toString( ) }
		${ helmetData.meta.toString( ) }
		<title>React SSR Base</title>
		<link rel="stylesheet" type="text/css" href="./styles.css" />
	</head>
	<style>
* {
    font-family: 'Roboto', sans-serif !important;
    font-weight: 100 !important;
}
	</style>
	<body id="page-top">
		<div id="app">${ reactDom }</div>
		<script src="https://blackrockdigital.github.io/startbootstrap-sb-admin-2/vendor/jquery/jquery.min.js"></script>
		<script src="https://blackrockdigital.github.io/startbootstrap-sb-admin-2/vendor/jquery-easing/jquery.easing.min.js"></script>
		<script>
$(document).ready(function(){
	$('<script/>',{
		type:'text/javascript',
		src:'https://blackrockdigital.github.io/startbootstrap-sb-admin-2/vendor/bootstrap/js/bootstrap.bundle.min.js'
	}).appendTo('head');
	$('<script/>',{
		type:'text/javascript',
		src:'https://blackrockdigital.github.io/startbootstrap-sb-admin-2/js/sb-admin-2.min.js'
	}).appendTo('head');
});
		</script>
		<script src="./app.bundle.js"></script>
	</body>
</html>
	`;
}
