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
function initCommonAttributes(elm) {
    var formObj = document.forms[0];
    // Setup form data for common element attributes
    setFormValue('title', tinyMCEPopup.dom.getAttrib(elm, 'title'));
    setFormValue('id', tinyMCEPopup.dom.getAttrib(elm, 'id'));
    setFormValue('class', tinyMCEPopup.dom.getAttrib(elm, 'class'));
    setFormValue('style', tinyMCEPopup.dom.getAttrib(elm, 'style'));
    selectByValue(formObj, 'dir', tinyMCEPopup.dom.getAttrib(elm, 'dir'));
    setFormValue('lang', tinyMCEPopup.dom.getAttrib(elm, 'lang'));
}

function setFormValue(name, value) {
    if(document.forms[0].elements[name]) document.forms[0].elements[name].value = value;
}

function selectByValue(form_obj, field_name, value, add_custom, ignore_case) {
    if (!form_obj || !form_obj.elements[field_name])
        return;

    var sel = form_obj.elements[field_name];

    var found = false;
    for (var i=0; i<sel.options.length; i++) {
        var option = sel.options[i];

        if (option.value == value || (ignore_case && option.value.toLowerCase() == value.toLowerCase())) {
            option.selected = true;
            found = true;
        } else
            option.selected = false;
    }

    if (!found && add_custom && value != '') {
        var option = new Option('Value: ' + value, value);
        option.selected = true;
        sel.options[sel.options.length] = option;
    }

    return found;
}

function setAttrib(elm, attrib, value) {
    var formObj = document.forms[0];
    var valueElm = formObj.elements[attrib.toLowerCase()];

    if (typeof(value) == "undefined" || value == null) {
        value = "";

        if (valueElm)
            value = valueElm.value;
    }

    if (value != "") {
        elm.setAttribute(attrib.toLowerCase(), value);

        if (attrib == "style")
            attrib = "style.cssText";

        if (attrib.substring(0, 2) == 'on')
            value = 'return true;' + value;

        if (attrib == "class")
            attrib = "className";

        eval('elm.' + attrib + '=value;');
    } else
        elm.removeAttribute(attrib);
}

function setAllCommonAttribs(elm) {
    setAttrib(elm, 'title');
    setAttrib(elm, 'id');
    setAttrib(elm, 'class');
    setAttrib(elm, 'style');
    setAttrib(elm, 'dir');
    setAttrib(elm, 'lang');
}

SXE = {
    inst : tinyMCEPopup.editor,
    updateElement : null
}

SXE.focusElement = SXE.inst.selection.getNode();

function updateElement(element_name) {
    tinyMCEPopup.execCommand('mceBeginUndoLevel');
    setAllCommonAttribs(SXE.updateElement);
    SXE.inst.nodeChanged();
    tinyMCEPopup.execCommand('mceEndUndoLevel');
    tinyMCEPopup.close();
}

function init() {
    tinyMCEPopup.resizeToInnerSize();
    var elm = tinyMCEPopup.editor.dom.getParent(SXE.focusElement, "p,div,h1,h2,h3,h4,h5,h6,pre,address");
    if(elm == null) {
        alert(SXE.inst.getLang('blockproperties.no_block_selected'));    
        tinyMCEPopup.close();
    }
    setTitle(elm.nodeName.toLowerCase());
    initCommonAttributes(elm);
    SXE.updateElement = elm;
}

function setTitle(name) {
    document.getElementById('dialog-title').innerHTML = SXE.inst.getLang('blockproperties.' + name + '_title');
}