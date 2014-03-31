describe("E2E Test: Index", function() {

	describe("index", function() {
		it("should display the correct title", function() {
			browser.get('/#');
			expect(browser.getTitle()).toBe("Sample Project");
		})
	})

});