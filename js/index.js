var m1=angular.module("mainApp",["ionic"]);
		m1.config(["$stateProvider",function($stateProvider){
			$stateProvider.state("main",{
				url:"/index",
				templateUrl:"./html/main.html"
			}).state("detail",{
				url:"/index/detail/:id",
				templateUrl:"./html/detail.html",
				controller:"detail"
			}).state("shopping",{
				url:"/shopping",
				templateUrl:"./html/shopping.html",
				controller:"shopping"
			}).state("search",{
				url:"/search",
				templateUrl:"./html/search.html",
				controller:"search"
			}).state("personal",{
				url:"/personal",
				templateUrl:"./html/personal.html",
				controller:"personal"
			}).state("find",{
				url:"/find",
				templateUrl:"./html/find.html",
				controller:"find"
			}).state("login",{
				url:"/login",
				templateUrl:"./html/login.html",
				controller:"login"
			}).state("register",{
				url:"/register",
				templateUrl:"./html/register.html",
				controller:"register"
			})
		}])
		
		
		m1.controller("index",["$scope","$state","$http",function($scope,$state,$http){
			$state.go("main");
			$scope.myActiveSlide = 0;
			$scope.datalist=[];
			$http({
					method:"get",
					url:"./json/my.json"
				}).success(function(data){
					console.log(data)
					$scope.datalist=data;
				})
			$scope.doRefresh=function(){
				console.log("aaa")
				$http({
					method:"get",
					url:"./json/my.json"
				}).success(function(data){
					console.log(data)
					$scope.datalist=data;
				})
				$scope.$broadcast('scroll.refreshComplete');
			}
			$scope.loadMore=function(){
				//console.log("bbb")
				$http({
					method:"get",
					url:"./json/my.json"
				}).success(function(data){
					for(var i=0;i<data.length;i++){
						$scope.datalist.push(data[i])
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
			}
		}])
		m1.controller("detail",["$scope","$stateParams","$http",function($scope,$stateParams,$http){
			//console.log($stateParams);
			$http({
				method:"get",
				url:"./json/my.json"
			}).success(function(data){
				for(var i=0;i<data.length;i++){
					if(data[i].id==$stateParams.id){
						$scope.data=data[i]
					}
				}
			})
			$scope.clickMe=function(){
				window.location.href="#/index"
			}
		}])
		m1.controller("shopping",["$scope","$http",function($scope,$http){
			$http({
				method:"get",
				url:"./json/my.json"
			}).success(function(data){
				$scope.dataList=data;
			})
		}])
		m1.controller("search",["$scope",function($scope){
			//console.log("ccc")
			$scope.fn=function(){
				window.location.href="#/find";
			}
		}])
		m1.controller("personal",["$scope",function($scope){
			
		}])
		m1.controller("find",["$scope",function($scope){
			var int=document.getElementById("search");
			console.log(int)
			int.focus()
			$scope.click=function(){
				window.location.href="#/search";
			}
		}])
		var arr1=[];
		var arr2=[];
		m1.controller("login",["$scope","$http",function($scope,$http){
			$scope.clickMe=function(){
				window.location.href="#/personal";
			}
			function getUser(name,psw){
				var user={
					username:name,
					password:psw
				}
				return user;
			}
			function loginData(user){
				$http({
					method:"post",
					url:"http://stuapi.ysd3g.com/api/login",
					params:{un:user.username,pwd:user.password,token:"zhang"}
				}).success(function(data){
					var data=eval(data);
					console.log(data)
					if(data.success==true){
						alert("登录成功")
						arr1.push(user);
						console.log(arr1)
						localStorage.setItem("login", JSON.stringify(arr1));
						location.href="#/personal";
					}else{
						alert("登录失败")
					}
				})
			}
			$scope._login=function(){
				var username=document.getElementById("loginName").value;
				var password=document.getElementById("loginPassword").value;
				if(username==""){
					alert("请输入用户名")
				}else{
					if(password==""){
						alert("请输入密码")
					}else{
						var user=getUser(username,password);
						loginData(user);	
					}
				}
			}
		}])
		m1.controller("register",["$scope","$http",function($scope,$http){
			$scope.clickMe=function(){
				window.location.href="#/login"
			}
			$scope.fn=function(){
				window.location.href="#/login"
			}
			var getUser=function(name,psw){
				var user={
					username:name,
					password:psw
				}
				return user;
			}
			var registerData=function(user){
				$http({
					method:"post",
					url:"http://stuapi.ysd3g.com/api/CreateUser",
					params:{loginName:user.username,pwd:user.password,email:"",mtel:13540050921,token:"zhang"}
				}).success(function(data){
					var data=eval(data);
					console.log(data)
					if(data.success==true){
						alert("恭喜你，注册成功！")
						arr2.push(user);
						console.log(arr2)
						localStorage.setItem("register", JSON.stringify(arr2));
						location.href="#/login";
					}else{
						alert("注册失败")
					}
				})
			}
			$scope._register=function(){
				var name=document.getElementById("name").value,
					psw=document.getElementById("psw").value,
					repsw=document.getElementById("repsw").value;
				if(name==""){
					alert("请输入用户名")
				}else{
					if(psw==""){
						alert("请输入密码")
					}else{
						if(psw==repsw){
							var user=getUser(name,psw)
							registerData(user)
						}else{
							alert("两次输入的密码不一致")
						}
					}
				}
			}
		}])
