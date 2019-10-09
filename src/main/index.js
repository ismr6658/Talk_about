import { app, powerMonitor, BrowserWindow, Tray, Menu, ipcMain, clipboard, shell, dialog } from 'electron'
import path from 'path'
import nedb from 'nedb'




let db = new nedb({
	autoload: true,
	filename: path.join(app.getPath('userData'), 'db/device.db')
})



let login = {
	username: null,
	token: null
}




/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}


//登录页
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`


//创建系统图标
var appIcon = null,
	toUser = null,
	timer = null;


function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 340,
		width: 430,
		frame: false,
		resizable: false,
		title: 'IM',
		transparent: true,
		maximizable: false,
		icon: path.join(__static, 'app.png'),
		webPreferences: {
			webSecurity: false
		}
	})


	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})



	//启动系统图标
	if (appIcon == null) {

		let icon = path.join(__static, 'app.png')
		appIcon = new Tray(icon);
		//  appIcon = new Tray(path.resolve(__dirname,'../renderer/assets/app.ico'));
		var contextMenu = Menu.buildFromTemplate([
			{ label: '设置' },
			{ label: '帮助' },
			{ label: '关于' },
			{
				label: '退出', click: function () {
					if (homeWin) {
						homeWin.webContents.send('login_out')
					}
					app.quit()
				}
			}
		]);
		appIcon.setToolTip('海洋局IM');
		appIcon.setContextMenu(contextMenu);

		appIcon.on('click', function () {
			console.log('点击托盘图标')
			appIcon.setImage(path.join(__static, 'app.png'));
			if (homeWin) {
				homeWin.show()
				clearInterval(timer)
				timer = null 
				if (toUser != null) {
					homeWin.webContents.send('openWin', toUser)
					toUser = null;

				}
				appIcon.setImage(path.join(__static, 'app.png'));

			}
		})

	}



}







//主页
let homeWin
const homeURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080/#/home`
	: `file://${__dirname}/index.html#home`

function homeWindow() {
	homeWin = new BrowserWindow({
		width: 860,
		height: 640,
		frame: false,
		transparent: true,
		useContentSize: true,
		// backgroundColor:'transparent',
		icon: path.join(__static, 'app.png'),
		webPreferences: {
			webSecurity: false
		}
	})
	homeWin.loadURL(homeURL)
	//最大化窗口取消阴影
	homeWin.on('maximize', () => {
		homeWin.webContents.send('maximize')
	})
	//退出最大化窗口加上阴影
	homeWin.on('unmaximize', () => {
		homeWin.webContents.send('unmaximize')
	})
	homeWin.on('focus', () => {
		appIcon.setImage(path.join(__static, 'app.png'));
		clearInterval(timer)
	

	})
	homeWin.on('close', () => {
		homeWin = null
	})
	// 打开调试窗口 正式地址要取消
	// homeWin.openDevTools()

}

//重新登录
ipcMain.on('relogin', function (event, args) {
	homeWin.close()
	createWindow()
})


app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

homeWin.flashFrame(true)

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */


ipcMain.on('newMsg', (event, args) => {
	/* 监听服务器发过来的新消息通知  改变状态栏背景色和托盘图标*/
	if(timer){
		clearInterval(timer)
	}
	console.log(args)
	toUser = args
	homeWin.flashFrame(true)
	interVal()

})

function interVal() {
	var count = 0
	timer = setInterval(function () {
		if (count++ % 2 == 0) {
			appIcon.setImage(path.join(__static, 'app.png'));
		} else {
			appIcon.setImage(path.join(__static, 'trans.png'));
		}
	}, 400)
}




//用户登录
ipcMain.on('login', (event, args) => {
	console.log(args)
	login = args

	//打开主页
	homeWindow()
	mainWindow.close()
})

//从主页获取登录信息
ipcMain.on('get-login', (event, args) => {
	event.sender.send('get-login', login)
	db.find({ action: 'contact', user: login.username }, (err, data) => {
		if (err) {
		} else {
			var arr = {}
			arr.list = []
			if (data.length > 0) {
				arr = data[0]
			}
			console.log('--------ret')
			event.sender.send('find-contact-ret', arr)

		}
	})
})


ipcMain.on('message', function (event, arg) {
	console.log(arg)
	var abc = null
	abc = dialog.showOpenDialog({
		properties: ['openFile']
	})
	console.log(abc)
	if (abc) {
		event.sender.send('get', abc[0])
	}
})

ipcMain.on('choose_img', function (event, arg) {
	var ret = null
	var filters
	if (arg == 'img') {
		filters = [
			{
				name: 'Images',
				extensions: ['jpg', 'png', 'gif']
			}
		]
	} else if (arg == 'file') {
		filters = [
			{
				name: 'All Files',
				extensions: ['*']
			}
		]
	}

	ret = dialog.showOpenDialog({
		properties: ['openFile'],
		filters: filters
	})

	if (ret) {
		event.sender.send('ret', ret[0])
	}

})





//数据库操作

//清除所有数据
ipcMain.on('clear-all-data', (event, arg) => {
	db.remove({}, { multi: true }, function (err, data) {
	})
})


//获取对话列表
ipcMain.on('find-contact', (event, arg) => {
	db.find({ action: 'contact', user: login.username }, (err, data) => {
		if (err) {
		} else {
			var arr = {}
			arr.list = []
			if (data.length > 0) {
				arr = data[0]
			}
			console.log('--------ret')
			event.sender.send('find-contact-ret', arr)

		}
	})
})


//跟新对话列表
ipcMain.on('insert-contact', function (event, arg) {

	//  db.count({user:})
	let obj = {
		action: 'contact',
		user: login.username,
		list: arg
	}
	db.count({ action: 'contact', user: login.username }, function (err, count) {
		if (err) {
		} else {
			if (count == 0) {
				db.insert(obj, (err, data) => {
					if (err) {
					} else {
					}
				})
			}
			else {
				db.update({ action: 'contact', user: login.username }, obj, {}, function (err, num) {
					if (err) {
					} else {
					}
				})
			}
		}
	})
})


//获取所有消息
ipcMain.on('find-chat', (event, args) => {
	db.find({ action: 'chat', user: login.username }, (err, data) => {
		if (err) {
			console.log(err)
		} else {
			console.log(data)
			var arr = []
			if (data.length > 0) {
				arr = data[0].list
			}
			event.sender.send('find-chat', arr)
		}
	})
})


//添加消息
ipcMain.on('insert-chat', (event, args) => {
	var obj = {
		action: 'chat',
		user: login.username,
		list: args
	}
	console.log('insert-chat' + obj)
	db.count({ action: 'chat', user: login.username }, (err, num) => {
		if (num == 0) {
			console.log(args)
			db.insert(obj, (err, data) => {
			})
		} else {
			db.update({ action: 'chat', user: login.username }, obj, function (err, data) {

			})
		}
	})
})


//打印数据库
ipcMain.on('print-database', (event, args) => {
	db.find({}, { multi: true }, (err, data) => {
		console.log(data)
	})
})


//最大化主窗口
ipcMain.on('toggle_size', (events, args) => {
	var ret = homeWin.isMaximized()
	if (args) {
		homeWin.unmaximize()
		homeWin.webContents.send('unmaximize')
	} else {
		homeWin.maximize()
		homeWin.webContents.send('maximize')
	}
})


//存入表情
ipcMain.on('set_emoji', (events, args) => {
	db.count({ action: 'emoji' }, (err, num) => {
		if (num == 0) {
			db.insert(args, (err, data) => {
			})
		} else {
			db.update({ action: 'emoji' }, obj, function (err, data) {

			})
		}
	})
})

//获取表情
ipcMain.on('get_emoji', (events, args) => {
	db.find({ action: 'emoji' }, (err, data) => {
		var arr = []
		if (data.length > 0) {
			arr = data
		}
		events.sender.send('get_emoji', arr)
	})
})




//心跳
// setInterval(function () {
// 	console.log('bit')
// }, 2500)