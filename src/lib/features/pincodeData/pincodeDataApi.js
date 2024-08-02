

export async function getDataByPostcode(postcode) {
    try {
        const header = {
            "Content-type": "application/json",
        }
        const response = await fetch(
            'https://lab.pixel6.co/api/get-postcode-details.php',
            {
                method: "POST",
                headers: header,
                body: JSON.stringify(postcode)
            }
        )

        if (response.ok) {
            const data = await response.json();
            return { data };
        }
        else {
            const error = await response.text();
            return { error };
        }
    } 
    catch (error) {
        return { error };
    }
}