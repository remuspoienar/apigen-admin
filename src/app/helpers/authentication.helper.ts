export let authHandler: Object = {
    data: function (data: any) {
        return this._auth.getUserData().subscribe((data: any) => this._router.navigate(['dashboard']), (error: any) => this.errorMsg = error)
    },
    error: function (error: any) {
        this.errorMsg = error;
        this.loading = false;
    }
}