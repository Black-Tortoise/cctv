var DurationSumWin = function(){
	return {
		className : 'DurationSumWin',
		win : new Ext.Window({
			//id : "winwin",
			title : "时长统计",
			collapsible  : false,
			closable : false,
			width : 250,
			height : 250,
			resizable : false,
			//modal : true,
			bodyStyle : 'padding : 20px 20px',			
			//x : 950,
			//y :50,
			layout : 'fit',
			items : [{
					xtype : 'panel',
					frame : true,
					layout : 'form',	
					buttonAlign:'center',						
					html : '<table width="270">'+
//					'<tr><td colspan="2"><input type="radio" name="radio" id="rAllData1" checked="checked" value="0">统计全部结果集</input></td></tr>'+
//					'<tr><td colspan="2"><input type="radio" name="radio" id="rSomeData1" value="1"  >统计部分结果集:</input></td></tr>'+
//					'<tr><td width="15"></td><td>第<input  style="width : 50;padding : 0 5;margin:0 5" id="toExcelFrom1" type="text" value="1">条到<input id="toExcelTo1" type="text" value="1000"  style="width : 50;padding : 0 5;margin:0 5">条</input></td></tr>'+
					'<tr><td><label>统计结果：</label></td></tr>'+
					'<tr><td><label>时长（帧）</label></td></tr>'+
					'<tr><td><input type="text" name="sumFrame" id="sumFrame" /></td></tr>'+
					'<tr><td><label>时长（时码-PAL制）</label></td></tr>'+
					'<tr><td><input type="text" name="sumTimeCode" id="sumTimeCode" /></td></tr>'+
					'</table>',
					buttons : [
//						{
//							xtype:'button',
//							//scope : this,
//							text : '统计',
//							handler: function(){
//								var rSomeData1 = Ext.get('rSomeData1').dom;
//								var start = -1;
//								var end = -1;
//								if(rSomeData1.checked){
//									start = Ext.get('toExcelFrom1').dom.value;
//									end = Ext.get('toExcelTo1').dom.value;
//								}											
//								DurationSumWin.startDo(start,end);
//							}
//						},
						{
							xtype:'button',
							text : '关闭',
							handler: function(){
								DurationSumWin.hide();
							}
						}
					]
									
			}]		
		}),
		setParas : function(para){
			this.para = para;
		},
		getParas : function(){
			return this.para;
		},
		setTotal : function(total){
			this.total = total;
		},
		getTotal : function(){
			return this.total;
		},
		
		show : function(b,e){
			//window对象可以自己判断是否已打开。
			this.win.show(b.getEl(), DurationSumWin.startDo, DurationSumWin);//让窗口显示出来	
		},
		hide : function(){
			this.win.hide();
		},
		close : function(){
			this.win.close();
		},
		startDo : function(){
//			if(start == -1 && end == -1){ //导出所有
//				start = 0;
//				limit = this.getTotal();
//			}else{
//				start = (start-1)<0 ? 0 : (start-1);
//				limit = end-start+1;
//			}
			
			var basePara = this.getParas();
			var callPara = basePara.callPara;
			
			var url = Global.getRootPath() + '/';
			
			Ext.getBody().mask();
			Ext.Ajax.request({
				url : url + 'durationSumServlet',
				method : 'post',
				params : {
					para:callPara
				},
				success : function(response, request) {
					var result  = Ext.util.JSON.decode(response.responseText);
					if(result.success){
						Ext.get("sumFrame").dom.value = result.data.sumFrame;
						Ext.get("sumTimeCode").dom.value = result.data.sumTimeCode;
                   		Ext.getBody().unmask();
					}else{
						Ext.MessageBox.alert('Failed', "统计失败，请联系媒资管理员！");
					}
				},
                failure: function (result, request) {
                    Ext.MessageBox.alert('Failed', Resource.pub_wrongMsg + ' ' + (result.statusText || Resource.pub_wrongMsg1) +'<br>' + Resource.pub_wrongMsg2);
                    Ext.getBody().unmask();
                }
            });
		}
	}
}();
