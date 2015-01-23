<?php
/**
 * VectorUp adds CSS and JavaScript to style MediaWiki and further extensions more modern and consistently
 *
 * Currently "upgraded":
 * * MediaWiki (Buttons, Typography)
 * * SMW (Buttons)
 * * SemanticForms (Form / Input Styles)
 * * HeaderTabs
 * *
 *
 * For more info see http://mediawiki.org/wiki/Extension:VectorUp
 *
 * @file
 * @ingroup Extensions
 * @author Simon Heimler, 2014
 * @license GNU General Public Licence 2.0 or later
 */

//////////////////////////////////////////
// VARIABLES                            //
//////////////////////////////////////////


//////////////////////////////////////////
// CONFIGURATION                        //
//////////////////////////////////////////


//////////////////////////////////////////
// CREDITS                              //
//////////////////////////////////////////

$wgExtensionCredits['other'][] = array(
   'path'           => __FILE__,
   'name'           => 'VectorUp',
   'author'         => array('Simon Heimler'),
   'version'        => '0.0.1',
   'url'            => 'https://www.mediawiki.org/wiki/Extension:VectorUp',
   'descriptionmsg' => 'VectorUp-desc',
);


//////////////////////////////////////////
// RESOURCE LOADER                      //
//////////////////////////////////////////

$wgResourceModules['ext.VectorUp'] = array(
   'scripts' => array(
      'lib/VectorUp.js',
   ),
   'styles' => array(
      'lib/MediaWiki-SMW.css',
   ),
   'dependencies' => array(
   ),
   'localBasePath' => __DIR__,
   'remoteExtPath' => 'VectorUp',
);

// Register hooks
$wgHooks['BeforePageDisplay'][] = 'VectorUpOnBeforePageDisplay';

/**
* Add libraries to resource loader
*/
function VectorUpOnBeforePageDisplay( OutputPage &$out, Skin &$skin ) {
  // Add as ResourceLoader Module
  $out->addModules('ext.VectorUp');
  return true;
}