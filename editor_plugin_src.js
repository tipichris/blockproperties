/*   Block Element Properties Plugin
 *
 *   Copyright Andrew Tetlaw 2006
 *   http://tetlaw.id.au/view/blog/block-element-properties-plugin-for-tinymce/
 * 
 *   Updated to TinyMCE 3.0 API by Chris Hastie 2011-11-18
 *   Code revisions Copyright Chris Hastie 2011
 *
 *   This file is part of blockproperties, a plugin for TinyMCE.
 *
 *   blockproperties is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   blockproperties is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with blockproperties. If not, see <http://www.gnu.org/licenses/>.
 */
( function() {
  tinymce.PluginManager.requireLangPack('blockproperties');

  tinymce.create('tinymce.plugins.BlockPropertiesPlugin', {

      getInfo : function() {
          return {
              longname : 'Block Element Properties plugin',
              author : 'Andrew Tetlaw, Chris Hastie',
              authorurl : 'http://tetlaw.id.au',
              infourl : 'http://tetlaw.id.au/view/blog/block-element-properties-plugin-for-tinymce/',
              version : "2.0"
          };
      },

      /**
        * Initializes the plugin, this will be executed after the plugin has been created.
        * This call is done before the editor instance has finished it's initialization so use the onInit event
        * of the editor instance to intercept that event.
        *
        * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
        * @param {string} url Absolute URL to where the plugin is located.
        */
      init : function(ed, url) {
              // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
              ed.addCommand('mceBlockProperties', function() {
                      var elm = ed.selection.getNode();
                      elm = ed.dom.getParent(elm, "p,div,h1,h2,h3,h4,h5,h6,pre,address");
                      if (elm) {
                        ed.windowManager.open({
                                file : url + '/properties.htm',
                                width : 350 ,
                                height : 280 ,
                                inline : 1,
                                resizable: false
                        }, {
                                plugin_url : url, // Plugin absolute URL
                                editor_id : ed.id // Custom argument
                        });
                      }
              });

              // Register blockproperties button
              ed.addButton('blockproperties', {
                      title : 'blockproperties.desc',
                      cmd : 'mceBlockProperties',
                      image : url + '/images/properties.gif'
              });

              // Add a node change handler, enables the button in the UI when a block element is selected
              ed.onNodeChange.add(function(ed, cm, n) {
                var elm = ed.dom.getParent(n, "p,div,h1,h2,h3,h4,h5,h6,pre,address");
                if (elm) {
                  cm.setDisabled('blockproperties', false);
                } else {
                  cm.setDisabled('blockproperties', true);
                }
              });
      },

  });


  tinymce.PluginManager.add('blockproperties', tinymce.plugins.BlockPropertiesPlugin);
})();