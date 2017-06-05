export class Permission {

    id: number;
    apiUserId: number;
    actions: Array<string>;

    private _delete: boolean = null;

    constructor(attributes: Object) {
        this.id = attributes['id'];
        this.apiUserId = attributes['api_user_id'] || null;
        this.actions = attributes['actions'] || null;
    }

    asApiRequestFormat() {
        let result = {};
        if (this.id) result['id'] = this.id;
        if (this.apiUserId) result['api_user_id'] = this.apiUserId;
        if (this._delete) result['_destroy'] = true;
        return result;
    }

    markAsRemoved() {
        this._delete = true;
    }

    get isMarkedAsDeleted() {
        return this._delete;
    }
}
