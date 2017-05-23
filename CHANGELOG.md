***1.0.0***

4/19/2017

- Initial commit

-----

4/20/2017

- Worked out some authorization methods.

-----

4/23/2017

- Added main and HTTP methods.  Updated request executor to return response DTOs.  Added Error and Response DTO as well as Exception Directive enum.

-----

4/27/2017

- Updated ResponseDTO to have correct result type.  Also JSON parsed the RAT service data string to return an object instead of a string representation of an object.  Updated constructor to take URL components.  Updated `getToken` method to require full URL.

-----

5/1/2017

- Worked out `postPage` method and post failure methods.

-----

5/15/2017

- Updated SDK to return promises.
- Fixed raw request response DTO.

-----

5/23/2017

- Added debugging ability through passing in a custom logger function
