(async function claimNFTs() {
    console.log('%cStart claiming NFTs...', 'color: blue; font-size: 16px;');

    // Customizable parameters
    const clickDelay = prompt("Enter the delay (in milliseconds) between clicks:", 1000);
    const scrollDelay = prompt("Enter the delay (in milliseconds) between scrolls:", 2000);
    const maxAttempts = prompt("Enter the maximum number of attempts to click a claim button:", 10);

    while (true) {
        // Find all buttons with the text "Claim"
        const claimButtons = Array.from(document.querySelectorAll('button')).filter(button => button.textContent.trim().toLowerCase() === 'claim');
        if (claimButtons.length === 0) {
            console.log('%cNo more claimable NFTs found.', 'color: green; font-size: 14px;');
            break;
        }

        // Click on the buttons
        for (let button of claimButtons) {
            let attempts = 0;
            while (button.textContent.trim().toLowerCase() === 'claim') {
                try {
                    button.click();
                    console.clear(); // Clear console
                    console.log('%cClaim button clicked.', 'color: orange; font-size: 12px;');
                    await new Promise(resolve => setTimeout(resolve, clickDelay)); // Standard delay between clicks
                } catch (e) {
                    console.error('%cError while clicking claim button:', 'color: red; font-size: 12px;', e);
                }
                attempts++;
                if (attempts > maxAttempts) {
                    console.error('%cError: Unable to claim NFT after multiple attempts.', 'color: red; font-size: 12px;');
                    break;
                }
            }
        }

        // Scroll down to load more buttons gradually
        window.scrollBy(0, window.innerHeight);
        console.log('%cScrolling down for more NFTs...', 'color: purple; font-size: 12px;');
        await new Promise(resolve => setTimeout(resolve, scrollDelay)); // Short delay to load all elements on the page

        // If reached the bottom of the page, scroll back to the top and check again
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('%cReached the bottom, scrolling back to the top...', 'color: purple; font-size: 12px;');
            window.scrollTo(0, 0);
            await new Promise(resolve => setTimeout(resolve, scrollDelay)); // Short delay to go back to the top
        }
    }

    console.log('%cAll NFTs claimed.', 'color: green; font-size: 16px; font-weight: bold;');
    
    // Display Twitter link
    const twitterUrl = 'https://twitter.com/iimbadlook';
    const twitterMessage = `All NFTs have been successfully claimed! Script by Mohammad.\nFollow me on Twitter for more updates: ${twitterUrl}`;
    console.log(`%c${twitterMessage}`, 'color: cyan; font-size: 14px; font-weight: bold;');
    console.log(`%cClick here to visit my Twitter profile: %c${twitterUrl}`, 'color: cyan; font-size: 14px; font-weight: bold;', 'color: blue; text-decoration: underline;');
})();
