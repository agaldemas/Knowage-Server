/*
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2016 Engineering Ingegneria Informatica S.p.A.
 * 
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */ 

Ext.ns("Sbi.cockpit.editor");

/**
 * @class Sbi.xxx.Xxxx
 * @extends Ext.util.Observable
 *
 * bla bla bla bla bla ...
 */

/**
 * @cfg {Object} config The configuration object passed to the cnstructor
 */
Sbi.cockpit.editor.WidgetEditorWizard = function(config) {

	Sbi.trace("[WidgetEditorWizard.constructor]: IN");

	// init properties...
	var defaultSettings = {
		title: "Widget editor"
	    , layout:'fit'
//	    , width: 1000
//    	, height: 600
	    , width: '98%'
	    , height: '98%'
	    , closeAction:'hide'
	    , plain: true
	    , modal: true

	};
	var settings = Sbi.getObjectSettings('Sbi.cockpit.editor.WidgetEditorWizard', defaultSettings);
	var c = Ext.apply(settings, config || {});
	Ext.apply(this, c);

	this.init();
	this.initEvents();



	c.items = [this.editorMainPanel];
	
	this.listeners = {
        close:this.onCancel,
        scope:this
    }

	Sbi.cockpit.editor.WidgetEditorWizard.superclass.constructor.call(this, c);

	Sbi.trace("[WidgetEditorWizard.constructor]: OUT");
};

Ext.extend(Sbi.cockpit.editor.WidgetEditorWizard, Ext.Window, {

	editorMainPanel: null
	, targetComponent: null

	// -----------------------------------------------------------------------------------------------------------------
    // public methods
	// -----------------------------------------------------------------------------------------------------------------

	, getWizardTargetComponent: function() {
		return this.targetComponent;
	}

	, getDatasetBrowserPage: function() {
		return this.editorMainPanel.getDatasetBrowserPage();
	}

	, getWidgetEditorPage: function() {
		return this.editorMainPanel.getWidgetEditorPage();
	}

	, setWizardTargetComponent: function(component) {
		Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: IN");
		this.targetComponent = component;
		var widget = this.targetComponent.getWidget();

		if(Sbi.isValorized(widget)) {
			Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: target component already contains a widget");
			this.resetWizardState();
			var widgetConf = widget.getConfiguration();
			Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: widget conf is equal to [" + Sbi.toSource(widgetConf) + "]");

			if ((widgetConf.storeId) || (widget.wtype == 'selection')){
				Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: select dataset [" + widgetConf.storeId + "]");
				
				if(Sbi.isValorized(this.getDatasetBrowserPage())){
					this.getDatasetBrowserPage().setPageState({
						dataset: widgetConf.storeId
					});
				}
	
				this.getWidgetEditorPage().setPageState(widgetConf);
				Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: move to page [" + 1 + "]");
				this.editorMainPanel.moveToPage (1);
				// if opening in editing mode open second tab page
				if(widget.wtype != 'selection'){
					this.editorMainPanel.widgetEditorPage.widgetEditorPanel.mainPanel.setActiveTabPar(1);				
				}
			}else if((widget.wtype == 'text') || (widget.wtype == 'image') || (widget.wtype == 'document')) {
					this.getWidgetEditorPage().setPageState(widgetConf);
					this.editorMainPanel.moveToPage (0);
					this.editorMainPanel.widgetEditorPage.widgetEditorPanel.mainPanel.setActiveTabPar(1);					
				} else {
				Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: there are no a used dataset");
				Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: widgetConf [" + Sbi.toSource(widgetConf) + "]");
				Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: move to page [" + 0 + "]");
				this.editorMainPanel.moveToPage(0);
			}
		} else {
			Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: target component does not contains any widget");
			this.resetWizardState();
			if(this.editorMainPanel.widgetType === Sbi.constants.cockpit.chart){
				this.editorMainPanel.widgetEditorPage.widgetEditorPanel.mainPanel.setActiveTabPar(1);
			}
			this.editorMainPanel.moveToPage(0);
		}
		Sbi.trace("[WidgetEditorWizard.setWizardTargetComponent]: OUT");
	}


	, getWizardState: function(running) {
		return this.editorMainPanel.getWizardState(running);
	}

	, setWizardState: function(editorState) {
		Sbi.trace("[WidgetEditorWizard.setWizardState]: IN");
		Sbi.trace("[WidgetEditorWizard.setWizardState]: wizard new configuration is equal to [" + Sbi.toSource(editorState) + "]");
		this.editorMainPanel.setWizardState(editorState);
		Sbi.trace("[WidgetEditorWizard.setWizardState]: OUT");
	}

	, resetWizardState: function() {
		Sbi.trace("[WidgetEditorWizard.resetWizardState]: IN");
		this.editorMainPanel.resetWizardState();
		Sbi.trace("[WidgetEditorWizard.resetWizardState]: OUT");
	}

	// -----------------------------------------------------------------------------------------------------------------
    // init methods
	// -----------------------------------------------------------------------------------------------------------------

	, init: function(){
		Sbi.trace("[WidgetEditorWizard.init]: IN");

		this.editorMainPanel = new Sbi.cockpit.editor.WidgetEditorWizardPanel({
			usedDatasets: this.usedDatasets
			, wcId: this.wcId
			, widgetType: this.widgetType
		});
		this.editorMainPanel.on('cancel', this.onCancel, this);
		this.editorMainPanel.on('submit', this.onSubmit, this);

		Sbi.trace("[WidgetEditorWizard.init]: OUT");
	}

	, initEvents: function() {
		this.addEvents(
			/**
			* @event indicatorsChanged
			* Fires when data inserted in the wizard is canceled by the user
			* @param {WidgetEditorWizard} this
			*/
			'cancel'
			/**
			* @event apply
			* Fires when data inserted in the wizard is applied by the user
			* @param {WidgetEditorWizard} this
			*/
			, 'apply'
			/**
			* @event submit
			* Fires when data inserted in the wizard is submitted by the user
			* @param {WidgetEditorWizard} this
			*/
			, 'submit'
		);
	}


	// -----------------------------------------------------------------------------------------------------------------
    // utility methods
	// -----------------------------------------------------------------------------------------------------------------

	, onCancel: function(){
		this.fireEvent("cancel", this);
	}

	, onApply: function(){
		this.fireEvent("apply", this);
	}

	, onSubmit: function(){
		this.fireEvent("submit", this);
	}

});
