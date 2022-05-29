describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const firstUser = {
      name: 'Topias',
      username: 'tha',
      password: 'salainen'
    }
    const secondUser = {
      name: 'Tester',
      username: 'tester',
      password: 'tester'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', firstUser)  
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)     
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tha')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.info')
      .should('contain', 'Logging succeed')
      .and('have.css', 'color', 'rgb(0, 128, 0)')      
      cy.contains('Bloglist')
      cy.contains('Topias logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tha')
      cy.get('#password').type('xxxx')
      cy.get('#login-button').click()

      cy.get('.alert')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')   
      cy.contains('Log in to application')     
    })  
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login( { username: 'tha', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()
      cy.contains('Create new blog')
      cy.get('#title').type('test-title')
      cy.get('#author').type('test-author')
      cy.get('#url').type('test-url')
      cy.get('#create-blog-button').click()

      cy.get('.info')
      .should('contain', 'a new blog test-title by test-author added')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('test-title test-author')
      cy.contains('view')
    })

    describe('and existing blogs', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'first', url: '1', likes: 0})
        cy.createBlog({ title: 'second blog', author: 'second', url: '2', likes: 9})
        cy.createBlog({ title: 'third blog', author: 'third', url: '3', likes: 10})
        cy.createBlog({ title: 'fourth blog', author: 'fourth', url: '4', likes: 99})
      })
      
      it('can be liked', function() {
        cy.contains('first blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('likes: 0')
        cy.contains('likes').parent().find('#like-button').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('likes: 1')
        cy.get('@likeButton').click()
        cy.contains('likes: 2')
      })

      it('can be deleted by creator', function() {
        cy.contains('second blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('delete').parent().find('#delete-button').click()
        
        cy.get('.info')
        .should('contain', 'Blog second blog by second removed')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('html').should('not.contain', 'second blog second')
      })

      it('can not be deleted by other', function() {
        cy.contains('logout').click()
        cy.login( { username: 'tester', password: 'tester' })
        cy.createBlog({ title: 'fifth blog', author: 'fifth', url: '5', likes: 0})
        cy.contains('second blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('html').should('not.contain', 'delete')
      })

      it('are arranged descending order by likes', function() {
        cy.get('.blogStyle').eq(0).should('contain', 'fourth blog')
        cy.get('.blogStyle').eq(1).should('contain', 'third blog')
        cy.get('.blogStyle').eq(2).should('contain', 'second blog')

        cy.contains('second blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('likes').parent().find('#like-button').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('likes: 10')
        cy.get('@likeButton').click()
        cy.contains('likes: 11')

        cy.get('.blogStyle').eq(1).should('contain', 'second blog')
        cy.get('.blogStyle').eq(2).should('contain', 'third blog')
      })
    })
  })    
})