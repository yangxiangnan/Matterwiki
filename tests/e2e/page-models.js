import { Selector } from 'testcafe';
import testUser from './test-user.json';

class Navbar {
    constructor (containerSelector) {
        this.container = Selector(containerSelector);

        this.adminLink      = this.container.find('a').withText('Admin');
        this.newArticleLink = this.container.find('a').withText('New Article');
        this.logoutLink     = this.container.find('a').withText('Logout');
    }
}

class Modal {
    constructor (selector) {
        this.container = Selector(selector);

        this.header = this.container.find('.modal-header');
        this.body   = this.container.find('.modal-body');
    }
}

class ArticlePublishedModal extends Modal {
    constructor () {
        super('#myModal');

        this.message = this.body.find('h1');
        this.details = this.body.find('h3');
        this.okBtn   = this.body.find('button').withText("That's great");
    }
}

export class LoginPage {
    constructor () {
        this.email    = Selector('#inputEmail');
        this.password = Selector('#inputPassword');
        this.signIn   = Selector('button').withText('Sign in');
    }

    async performLogin (t) {
        await t.typeText(this.email, testUser.email)
            .typeText(this.password, testUser.password)
            .click(this.signIn);
    }
}

class BaseLayoutPage {
    constructor () {
        this.appContainer = Selector('#app');
        this.navbar       = new Navbar('nav.navbar');
        this.alert        = Selector('div.s-alert-wrapper');
    }
}

export class HomePage extends BaseLayoutPage {
    constructor () {
        super();
    }
}

export class NewArticlePage extends BaseLayoutPage {
    constructor () {
        super();

        this.title                 = Selector('.new-article .input-title');
        this.editor                = Selector('trix-editor');
        this.createArticleBtn      = Selector('button').withText('Create Article');
        this.articlePublishedModal = new ArticlePublishedModal();
    }
}
